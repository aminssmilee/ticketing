<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'password',
        'role',

        // relasi ID baru
        'department_id',
        'sub_department_id',
        'gateway_id',
        'position_id',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',

        // CAST penting supaya ID tidak null
        'department_id' => 'integer',
        'sub_department_id' => 'integer',
        'gateway_id' => 'integer',
        'position_id' => 'integer',
    ];

    // Auto hash password
    public function setPasswordAttribute($value)
    {
        // Jika bukan bcrypt hash → hash
        if (strlen($value) < 60) {
            $this->attributes['password'] = bcrypt($value);
        } else {
            $this->attributes['password'] = $value;
        }
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    // OPTIONAL: relasi Eloquent
    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function subDepartment()
    {
        return $this->belongsTo(SubDepartment::class);
    }

    public function gateway()
    {
        return $this->belongsTo(Gateway::class);
    }

    public function position()
    {
        return $this->belongsTo(Position::class);
    }
}
