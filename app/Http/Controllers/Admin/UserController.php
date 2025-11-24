<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $q = $request->q;
        $timeRange = $request->timeRange ?? '90d';

        // Tentukan rentang waktu filter
        $dateLimit = match ($timeRange) {
            '7d'  => now()->subDays(7),
            '30d' => now()->subDays(30),
            default => now()->subDays(90),
        };

        // Ambil user + relasi
        $users = User::with([
            'department:id,name',
            'subDepartment:id,name',
            'gateway:id,name',
            'position:id,name',
        ])
            ->where('created_at', '>=', $dateLimit)
            ->when($q, function ($query) use ($q) {
                $query->where(function ($q2) use ($q) {
                    $q2->where('name', 'like', "%$q%")
                        ->orWhere('email', 'like', "%$q%");
                });
            })
            ->orderBy('created_at', 'desc')
            ->paginate($request->per_page ?? 10)
            ->withQueryString();

        return Inertia::render('Admin/UserManagement', [
            'users' => $users,
            'filters' => [
                'q' => $q,
                'timeRange' => $timeRange,
            ],
        ]);
    }



    public function updateRole(Request $request)
    {
        $request->validate([
            'id' => 'required',
            'role' => 'required'
        ]);

        $user = User::findOrFail($request->id);
        $user->role = $request->role;
        $user->save();

        return back()->with('success', 'Role updated!');
    }

    public function destroy($id)
    {
        if ($id == auth()->id()) {
            return back()->with('error', 'You cannot delete yourself.');
        }

        User::findOrFail($id)->delete();

        return back()->with('success', 'User deleted!');
    }
}
