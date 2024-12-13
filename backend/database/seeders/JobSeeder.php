<?php

namespace Database\Seeders;

use App\Models\Enterprise;
use App\Models\Job;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    public function run(): void
    {
        $enterprises = Enterprise::all();

        foreach ($enterprises as $enterprise) {
            Job::factory()->create([
                'enterprise_id' => $enterprise->id,
            ]);
        }
    }
}

