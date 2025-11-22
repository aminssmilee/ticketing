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
    ];

    // Kalau mau tetap pakai auto-hash bisa, tapi Hash::make di controller sudah cukup.
    // public function setPasswordAttribute($value)
    // {
    //     if (strlen($value) < 60) {
    //         $this->attributes['password'] = bcrypt($value);
    //     } else {
    //         $this->attributes['password'] = $value;
    //     }
    // }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    // Relasi optional, kalau mau dipakai nanti
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
