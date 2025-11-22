<?php

// database/seeders/LocationSeeder.php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Gateway;

class LocationSeeder extends Seeder
{
    public function run(): void
    {
        Gateway::insert([
            ['code' => 'GW01', 'name' => 'GW 01 Batam'],
            ['code' => 'GW02', 'name' => 'GW 02 Cikarang'],
            ['code' => 'GW03', 'name' => 'GW 03 Pontianak'],
            ['code' => 'GW04', 'name' => 'GW 04 Banjarmasin'],
            ['code' => 'GW05', 'name' => 'GW 05 Tarakan'],
            ['code' => 'GW06', 'name' => 'GW 06 Manado'],
            ['code' => 'GW07', 'name' => 'GW 07 Kupang'],
            ['code' => 'GW08', 'name' => 'GW 08 Ambon'],
            ['code' => 'GW09', 'name' => 'GW 09 Manokwari'],
            ['code' => 'GW10', 'name' => 'GW 10 Timika'],
            ['code' => 'GW11', 'name' => 'GW 11 Jayapura'],
        ]);
    }
}
