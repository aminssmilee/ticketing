<?php

namespace App\Http\Controllers\Ticket;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Http\Controllers\Controller;
use Box\Spout\Writer\Common\Creator\WriterEntityFactory;
use Box\Spout\Common\Entity\Style\Color;



class TicketController extends Controller
{
    /**
     * Halaman Open Ticket
     */
    public function open()
    {
        $user = auth()->user();

        return Inertia::render("Ticket/Open", [
            "gateway" => $user->gateway ? [
                "id"    => $user->gateway->id,
                "code"  => $user->gateway->code,
                "name"  => $user->gateway->name,
            ] : null,

            "categories" => \App\Models\Category::with("subcategories")
                ->orderBy("name")
                ->get()
                ->map(fn($c) => [
                    "id"   => $c->id,
                    "name" => $c->name,
                    "type" => $c->type,
                    "subcategories" => $c->subcategories
                        ->map(fn($s) => [
                            "id"   => $s->id,
                            "name" => $s->name,
                        ]),
                ]),
        ]);
    }

    /**
     * Detail Ticket
     */
    public function show($ticket_number)
    {
        $ticket = Ticket::with(['gateway', 'user', 'updates', 'categoryRef', 'subCategoryRef'])
            ->where('ticket_number', $ticket_number)
            ->firstOrFail();

        $updates = $ticket->updates()
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(fn($u) => [
                "date"        => $u->created_at->format('Y-m-d H:i'),
                "updated_by"  => $u->updated_by,
                "flag"        => $u->flag,
                "indication"  => $u->indication,
                "action"      => $u->action,
                "description" => $u->description,
            ]);

        return Inertia::render('Ticket/ViewTicket', [
            "ticket" => [
                'ticket_number' => $ticket->ticket_number,
                'gateway'       => $ticket->gateway->name ?? '-',
                'ticket_date'   => $ticket->created_at->format('Y-m-d H:i'),
                'start_date'    => $ticket->start_date,
                'category'      => $ticket->categoryRef->name ?? '-',
                'subcategory'   => $ticket->subCategoryRef->name ?? '-',
                'serial_number' => $ticket->serial_number,
                'flag'          => strtoupper($ticket->flag),
                'alarm'         => $ticket->alarm,
                'indication'    => $ticket->indication,
                'updated_by'    => $ticket->user->name ?? '-',
                'pic'           => $ticket->gateway->name ?? '-',
                'status'        => ucfirst($ticket->status),
                'duration'      => "-",
                'assigned_date' => $ticket->start_date,
                'end_date'      => $ticket->end_date ?? "-",
            ],
            "updates" => $updates
        ]);
    }

    /**
     * Store ticket
     */
    public function store(Request $request)
    {
        $request->validate([
            'gateway_id'        => 'required',
            'start_date'        => 'required|date',
            'category_id'       => 'required|integer|exists:categories,id',
            'sub_category_id'   => 'nullable|integer|exists:sub_categories,id',
            'serial_number'     => 'nullable|string',
            'flag'              => 'required|string',
            'alarm'             => 'nullable|string',
            'indication'        => 'nullable|string',
            'action'            => 'nullable|string',
            'description'       => 'nullable|string',
        ]);

        $category     = \App\Models\Category::find($request->category_id);
        $subcategory  = $request->sub_category_id
            ? \App\Models\SubCategory::find($request->sub_category_id)
            : null;

        $gateway      = \App\Models\Gateway::find($request->gateway_id);
        $gatewayCode  = $gateway->code ?? 'GW';

        $running      = str_pad(Ticket::count() + 1, 5, '0', STR_PAD_LEFT);
        $ticketNumber = "TID-{$gatewayCode}-" . date('Y-m') . "-{$running}";

        Ticket::create([
            'ticket_number'     => $ticketNumber,
            'user_id'           => auth()->id(),
            'gateway_id'        => $request->gateway_id,
            'start_date'        => $request->start_date,

            'category_id'       => $request->category_id,
            'sub_category_id'   => $request->sub_category_id,

            'category'          => $category?->name,
            'sub_category'      => $subcategory?->name,
            'old_category'      => $category?->name,
            'old_subcategory'   => $subcategory?->name,

            'serial_number'     => $request->serial_number,
            'flag'              => $request->flag,
            'alarm'             => $request->alarm,
            'indication'        => $request->indication,
            'action'            => $request->action,
            'description'       => $request->description,
            'status'            => 'open',
        ]);

        return redirect()
            ->route('ticket.list')
            ->with('success', 'Ticket berhasil dibuat!');
    }

    /**
     * List Ticket
     */
    public function list(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $status  = $request->get('status', null);

        $query = Ticket::with(['gateway', 'user', 'categoryRef', 'subCategoryRef'])
            ->orderBy('created_at', 'desc');

        if ($status && $status !== 'all') {
            $query->where('status', $status);
        }

        $tickets = $query->paginate($perPage)->withQueryString();

        $tickets->getCollection()->transform(function ($t) {
            return [
                'ticket_number' => $t->ticket_number,
                'gateway'       => $t->gateway->name ?? '-',
                'ticket_date'   => $t->created_at->format('Y-m-d H:i'),
                'start_date'    => $t->start_date,

                'category'      => $t->categoryRef->name ?? '-',
                'subcategory'   => $t->subCategoryRef->name ?? '-',
                'serial_number' => $t->serial_number,

                'flag'          => strtoupper($t->flag),
                'alarm'         => $t->alarm,
                'indication'    => $t->indication,
                'updated_by'    => $t->user->name ?? '-',

                'pic'           => ($t->gateway->code ?? '') . ' - ' . ($t->gateway->name ?? '-'),
                'status'        => ucfirst($t->status),
                'duration'      => "-",

                'assigned_by' => $t->user->name ?? '-',
                'assigned_date' => $t->start_date,
                'end_date'      => $t->end_date ?? "-",
            ];
        });

        return inertia("Ticket/List", [
            "tickets" => $tickets,
        ]);
    }

    /**
     * Edit ticket
     */
    public function edit($ticket_number)
    {
        $ticket = Ticket::with(['categoryRef', 'subCategoryRef', 'gateway'])
            ->where('ticket_number', $ticket_number)
            ->firstOrFail();

        return Inertia::render('Ticket/UpdateTicket', [
            "ticket" => [
                "ticket_number" => $ticket->ticket_number,
                "gateway"       => $ticket->gateway->code . " " . $ticket->gateway->name,
                "ticket_date"   => $ticket->created_at,
                "start_date"    => $ticket->start_date,
                "category"      => $ticket->categoryRef->name ?? "-",
                "subcategory"   => $ticket->subCategoryRef->name ?? "-",
                "serial_number" => $ticket->serial_number,
                "flag"          => $ticket->flag,
                "alarm"         => $ticket->alarm,
                "indication"    => $ticket->indication,
                "description"   => $ticket->description,
                "updated_by"    => auth()->user()->name,
                "pic"           => auth()->user()->Department->name ?? "-",
                "status"        => $ticket->status,
            ]
        ]);
    }

    /**
     * Update history
     */
    public function update(Request $request, $ticket_number)
    {
        $ticket = Ticket::where('ticket_number', $ticket_number)->firstOrFail();

        $request->validate([
            'flag'        => 'required|string',
            'indication'  => 'required|string',
            'action'      => 'required|string',
            'description' => 'nullable|string',
            'status'      => 'required|string',
            'end_date'    => 'nullable|date',
        ]);

        // 🔥 Simpan ke log update (ticket_updates)
        $ticket->updates()->create([
            'updated_by'  => auth()->user()->name,
            'flag'        => $request->flag,
            'indication'  => $request->indication,
            'action'      => $request->action,
            'description' => $request->description,
        ]);

        // 🔥 Proses perubahan status
        $newStatus = strtolower($request->status);

        // Jika ticket di-close
        if ($newStatus === 'close' || $newStatus === 'closed') {
            $ticket->update([
                'status'   => 'closed',
                'end_date' => $request->end_date ?? now(),
            ]);
        }
        // Jika hanya update biasa
        else if ($newStatus === 'assign') {
            $ticket->update([
                'status' => 'assign',
            ]);
        } else {
            $ticket->update([
                'status' => 'update',
            ]);
        }

        return redirect()
            ->route('ticket.view', $ticket_number)
            ->with('success', 'Ticket berhasil diupdate!');
    }

    /**
     * Download CSV Report
     */


    public function close(Request $request, $ticket_number)
    {
        $ticket = Ticket::where('ticket_number', $ticket_number)->firstOrFail();

        $request->validate([
            'end_date' => 'required|date',
        ]);

        $ticket->update([
            'status' => 'closed',
            'end_date' => $request->end_date,
        ]);

        return redirect()
            ->route('ticket.view', $ticket_number)
            ->with('success', 'Ticket berhasil ditutup.');
    }

    public function destroy($ticket_number)
    {
        $ticket = Ticket::where('ticket_number', $ticket_number)->first();

        if (!$ticket) {
            return back(); // jangan with error
        }

        $ticket->delete();

        return redirect()->back(); // jangan with success
    }
    public function report()
    {
        $categories = \App\Models\Category::with('subcategories')
            ->orderBy('name')
            ->get()
            ->map(fn($c) => [
                "id" => $c->id,
                "name" => $c->name,
                "subcategories" => $c->subcategories->map(fn($s) => [
                    "id" => $s->id,
                    "name" => $s->name
                ])
            ]);

        return inertia("Ticket/Report", [
            "categories" => $categories
        ]);
    }
    public function exportExcel(Request $request)
    {
        $tickets = Ticket::query()
            ->when($request->start_date, fn($q) => $q->whereDate('start_date', '>=', $request->start_date))
            ->when($request->end_date, fn($q) => $q->whereDate('start_date', '<=', $request->end_date))
            ->when($request->category, fn($q) => $q->where('category_id', $request->category))
            ->when($request->sub_category, fn($q) => $q->where('sub_category_id', $request->sub_category))
            ->with('gateway')
            ->get();

        $fileName = "ticket_report_" . now()->format("Ymd_His") . ".xlsx";

        $writer = WriterEntityFactory::createXLSXWriter();
        $writer->openToBrowser($fileName);

        // Header
        $header = WriterEntityFactory::createRowFromArray([
            "Ticket Number",
            "Gateway",
            "Category",
            "Sub Category",
            "Start Date",
            "Status",
            "Alarm",
            "Indication",
        ]);

        $writer->addRow($header);

        // Rows
        foreach ($tickets as $t) {
            $row = WriterEntityFactory::createRowFromArray([
                $t->ticket_number,
                $t->gateway->name ?? "-",
                $t->category,
                $t->sub_category,
                $t->start_date,
                $t->status,
                $t->alarm,
                $t->indication,
            ]);

            $writer->addRow($row);
        }

        $writer->close();
    }
}
