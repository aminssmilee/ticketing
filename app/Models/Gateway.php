<?php

// app/Models/Location.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Gateway extends Model
{
    use HasFactory;

    // karena migration-nya pakai "gateways", kita kasih nama tabel manual
    protected $table = 'gateways';

    protected $fillable = ['code', 'name'];
}
