<?php

namespace App\Http\Controllers\Ticket;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Ticket;
use App\Http\Controllers\Controller;

class TicketController extends Controller
{
    /**
     * Halaman Open Ticket (AUTO GENERATE GATEWAY user login)
     */
    public function open()
    {
        $user = auth()->user();

        return Inertia::render("Ticket/Open", [
            "gateway" => $user->gateway ? [
                "id" => $user->gateway->id,
                "code" => $user->gateway->code,
                "name" => $user->gateway->name,
            ] : null,
        ]);
    }


    /**
     * Halaman View Ticket (Detail Ticket)
     */
    public function show($ticket_number)
    {
        $ticket = \App\Models\Ticket::with(['gateway', 'user', 'updates'])
            ->where('ticket_number', $ticket_number)
            ->firstOrFail();

        // ================================
        // 🔥 Ambil UPDATE HISTORY (real)
        // ================================
        $updates = $ticket->updates()
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(function ($u) {
                return [
                    "date"        => $u->created_at->format('Y-m-d H:i'),
                    "updated_by"  => $u->updated_by,
                    "flag"        => $u->flag,
                    "indication"  => $u->indication,
                    "action"      => $u->action,
                    "description" => $u->description,
                ];
            });

        return Inertia::render('Ticket/ViewTicket', [
            "ticket" => [
                'ticket_number' => $ticket->ticket_number,
                'gateway'       => $ticket->gateway->name ?? '-',
                'ticket_date'   => $ticket->created_at->format('Y-m-d H:i'),
                'start_date'    => $ticket->start_date,
                'category'      => $ticket->category,
                'subcategory'   => $ticket->sub_category,
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

            // 🔥 Kirim ke FE
            "updates" => $updates
        ]);
    }


    public function store(Request $request)
    {
        $request->validate([
            'gateway_id'   => 'required',
            'start_date'   => 'required|date',
            'category'     => 'required|string',
            'sub_category' => 'nullable|string',
            'serial_number' => 'nullable|string',
            'flag'         => 'required|string',
            'alarm'        => 'nullable|string',
            'indication'   => 'nullable|string',
            'action'       => 'nullable|string',
            'description'  => 'nullable|string',
        ]);

        // Generate ticket number
        $gatewayCode = \App\Models\Gateway::find($request->gateway_id)->code ?? 'GW';
        $running = str_pad(\App\Models\Ticket::count() + 1, 5, '0', STR_PAD_LEFT);
        $ticketNumber = "TID-{$gatewayCode}-" . date('Y-m') . "-{$running}";

        $ticket = \App\Models\Ticket::create([
            'ticket_number' => $ticketNumber,
            'user_id'       => auth()->id(),
            'gateway_id'    => $request->gateway_id,
            'start_date'    => $request->start_date,
            'category'      => $request->category,
            'sub_category'  => $request->sub_category,
            'serial_number' => $request->serial_number,
            'flag'          => $request->flag,
            'alarm'         => $request->alarm,
            'indication'    => $request->indication,
            'action'        => $request->action,
            'description'   => $request->description,
            'status'        => 'open',
        ]);

        return redirect()->route('ticket.list')
            ->with('success', 'Ticket berhasil dibuat!');
    }

    public function list(Request $request)
{
    // Ambil per_page dari query (default 10)
    $perPage = $request->get('per_page', 10);

    // Ambil halaman (default 1)
    $page = $request->get('page', 1);

    // Optional: filter status
    $status = $request->get('status', null);

    $query = \App\Models\Ticket::with(['gateway', 'user'])
        ->orderBy('created_at', 'desc');

    // FILTER STATUS (opsional)
    if ($status && $status !== 'all') {
        $query->where('status', $status);
    }

    // === PAGINATION ===
    $tickets = $query->paginate($perPage)->withQueryString();

    // === MAP RESPONS ===
    $tickets->getCollection()->transform(function ($t) {
        return [
            'ticket_number' => $t->ticket_number,
            'gateway' => $t->gateway->name ?? '-',
            'ticket_date' => $t->created_at->format('Y-m-d H:i'),
            'start_date' => $t->start_date,
            'category' => $t->category,
            'subcategory' => $t->sub_category,
            'flag' => strtoupper($t->flag),
            'alarm' => $t->alarm,
            'indication' => $t->indication,
            'updated_by' => $t->user->name ?? '-',
            'pic' => ($t->gateway->code ?? '') . ' - ' . ($t->gateway->name ?? "-"),
            'status' => ucfirst($t->status),
            'duration' => "-",
            'assigned_date' => $t->start_date,
            'end_date' => $t->end_date ?? "-",
        ];
    });

    return inertia("Ticket/List", [
        "tickets" => $tickets,
    ]);
}


    public function edit($ticket_number)
    {
        $ticket = Ticket::where('ticket_number', $ticket_number)->firstOrFail();

        return Inertia::render('Ticket/UpdateTicket', [
            "ticket" => [
                "ticket_number" => $ticket->ticket_number,
                "gateway"       => $ticket->gateway->code . " " . $ticket->gateway->name,
                "ticket_date"   => $ticket->created_at,
                "start_date"    => $ticket->start_date,
                "category"      => $ticket->category,
                "subcategory"   => $ticket->sub_category,
                "serial_number" => $ticket->serial_number,
                "flag"          => $ticket->flag,
                "alarm"         => $ticket->alarm,
                "indication"    => $ticket->indication,
                "description"   => $ticket->description,
                "updated_by"    => auth()->user()->name, // user yang login
                "pic"           => auth()->user()->Department->name ?? auth()->user()->department->name ?? "-", // PIC = dept user

                "status"        => $ticket->status,
            ]
        ]);
    }




    public function update(Request $request, $ticket_number)
    {
        $ticket = Ticket::where('ticket_number', $ticket_number)->firstOrFail();

        $request->validate([
            'flag' => 'required|string',
            'indication' => 'required|string',
            'action' => 'required|string',
            'description' => 'nullable|string',
        ]);

        // Simpan update ke tabel ticket_updates (log)
        $ticket->updates()->create([
            'updated_by' => auth()->user()->name,
            'flag' => $request->flag,
            'indication' => $request->indication,
            'action' => $request->action,
            'description' => $request->description,
        ]);

        // Update status ticket atau last update
        $ticket->update([
            'status' => 'Update',
            'updated_at' => now(),
        ]);

        return redirect()
            ->route('ticket.view', $ticket_number)
            ->with('success', 'Ticket berhasil diupdate!');
    }

    public function downloadReport(Request $request)
    {
        $tickets = Ticket::query()
            ->when($request->start_date, fn($q) => $q->whereDate('start_date', '>=', $request->start_date))
            ->when($request->end_date, fn($q) => $q->whereDate('start_date', '<=', $request->end_date))
            ->when($request->category, fn($q) => $q->where('category', 'like', "%{$request->category}%"))
            ->when($request->sub_category, fn($q) => $q->where('sub_category', 'like', "%{$request->sub_category}%"))
            ->with('gateway')
            ->orderBy('created_at', 'desc')
            ->get();

        $filename = "ticket_report_" . now()->format("Ymd_His") . ".csv";

        $headers = [
            "Content-type" => "text/csv",
            "Content-Disposition" => "attachment; filename=$filename",
        ];

        $callback = function () use ($tickets) {
            $file = fopen('php://output', 'w');

            // Header CSV
            fputcsv($file, [
                "Ticket Number",
                "Gateway",
                "Category",
                "Sub Category",
                "Start Date",
                "Status",
                "Alarm",
                "Indication"
            ]);

            foreach ($tickets as $t) {
                fputcsv($file, [
                    $t->ticket_number,
                    $t->gateway->name ?? "-",
                    $t->category,
                    $t->sub_category,
                    $t->start_date,
                    $t->status,
                    $t->alarm,
                    $t->indication,
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }
}