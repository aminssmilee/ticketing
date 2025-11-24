<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

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
        // ❗ Sementara DUMMY (belum pakai DB)
        // Nanti tinggal diganti pakai Ticket::where('ticket_number',$ticket_number)->first()
        $dummyTicket = [
            "ticket_number" => $ticket_number,
            "gateway"       => "GW01 Batam",
            "category"      => "RF",
            "subcategory"   => "BUC",
            "status"        => "Open",
            "alarm"         => "BUC1 Hang",
            "indication"    => "Power Low",
            "action"        => "Restart BUC",
            "pic"           => "Team RF",
            "created_at"    => "2025-08-14 08:00",
            "updated_at"    => "2025-08-14 12:23",
        ];

        return Inertia::render("Ticket/ViewTicket", [
            "ticket" => $dummyTicket,
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
}
