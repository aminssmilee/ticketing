<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\Gateway;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // ============ TOTAL TICKETS ============
        $total_tickets = Ticket::count();

        // ============ SUMMARY PER CATEGORY ============
        $summary = Ticket::selectRaw("category, COUNT(*) as total")
            ->groupBy("category")
            ->get()
            ->map(fn($row) => [
                "category" => $row->category,
                "total" => $row->total
            ]);

        // ============ GATEWAY LIST (AUTO) ============
        // Ambil semua gateway code: GW01–GW11
        $gateways = Gateway::orderBy('code')->pluck('code')->toArray();

        // ============ CATEGORY LIST ============
        $categories = Ticket::select("category")->distinct()->pluck("category");

        // ============ MATRIX BUILD ============
        $matrix = [];

        foreach ($categories as $cat) {
            $row = ["category" => $cat];

            foreach ($gateways as $gw) {
                $row[$gw] = Ticket::where("category", $cat)
                    ->whereHas("gateway", fn($q) => $q->where("code", $gw))
                    ->count() ?: "-";
            }

            $matrix[] = $row;
        }

        return Inertia::render("Ticket/Dashboard", [
            "total_tickets"       => $total_tickets,
            "summaryCategories"   => $summary,
            "matrix"              => $matrix,
            "gateways"            => $gateways,  // dikirim agar table bisa otomatis
        ]);
    }
}
