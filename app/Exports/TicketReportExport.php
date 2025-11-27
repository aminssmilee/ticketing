<?php

namespace App\Exports;

use App\Models\Ticket;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class TicketReportExport implements FromCollection, WithHeadings
{
    protected $filters;

    public function __construct($filters)
    {
        $this->filters = $filters;
    }

    public function headings(): array
    {
        return [
            'Ticket Number',
            'Gateway',
            'Category',
            'Sub Category',
            'Start Date',
            'End Date',
            'Status',
        ];
    }

    public function collection()
    {
        $q = Ticket::with('gateway')->orderBy('created_at', 'desc');

        if (!empty($this->filters['start_date'])) {
            $q->whereDate('created_at', '>=', $this->filters['start_date']);
        }

        if (!empty($this->filters['end_date'])) {
            $q->whereDate('created_at', '<=', $this->filters['end_date']);
        }

        if (!empty($this->filters['category'])) {
            $q->where('category', $this->filters['category']);
        }

        if (!empty($this->filters['sub_category'])) {
            $q->where('sub_category', $this->filters['sub_category']);
        }

        return $q->get()->map(function ($t) {
            return [
                $t->ticket_number,
                $t->gateway->name ?? '-',
                $t->category,
                $t->sub_category,
                $t->start_date,
                $t->end_date,
                ucfirst($t->status),
            ];
        });
    }
}
