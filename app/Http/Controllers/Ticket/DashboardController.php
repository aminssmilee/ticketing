<?php

namespace App\Http\Controllers\Ticket;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Ticket/Dashboard', [
            'stats' => [
                'total_tickets' => Ticket::count(),
                'open_tickets' => Ticket::where('status', 'Open')->count(),
                'closed_tickets' => Ticket::where('status', 'Close')->count(),
            ]
        ]);
    }
}
