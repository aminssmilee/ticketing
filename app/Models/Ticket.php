<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ticket extends Model
{
    use HasFactory;

    protected $table = "tickets";

    protected $fillable = [
        'ticket_number',
        'user_id',         // <= WAJIB
        'gateway_id',
        'start_date',
        'category',
        'sub_category',
        'serial_number',
        'flag',
        'alarm',
        'indication',
        'action',
        'description',
        'status',
    ];


    /*
    |--------------------------------------------------------------------------
    | RELATIONS
    |--------------------------------------------------------------------------
    */

    // User yang membuat tiket
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // User yang terakhir mengupdate tiket
    public function updater()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    // Gateway
    public function gateway()
    {
        return $this->belongsTo(Gateway::class, 'gateway_id');
    }

    // PIC (Person in Charge)
    public function pic()
    {
        return $this->belongsTo(User::class, 'pic_id');
    }
}
