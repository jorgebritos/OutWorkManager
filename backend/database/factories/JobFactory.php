<?php

namespace Database\Factories;

use App\Models\Job;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

class JobFactory extends Factory
{
    protected $model = Job::class;

    public function definition()
    {
        return [
            "description" => $this->faker->paragraph(),
            "is_check" => $this->faker->boolean(),
            "is_check_enterprise" => $this->faker->boolean(),
            "in_datetime" => Carbon::instance(
                $this->faker->dateTimeBetween('2020-01-01', '2026-12-31')
            )->format('Y-m-d H:i'),
            "in_datetime_confirm" => null,
            "out_datetime" => $this->faker->dateTime()->format('Y-m-d H:i'),
            "out_datetime_confirm" => null,
        ];
    }
}
