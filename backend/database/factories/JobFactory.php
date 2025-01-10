<?php

namespace Database\Factories;

use App\Models\Job;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobFactory extends Factory
{
    protected $model = Job::class;

    public function definition()
    {
        return [
            "description" => $this->faker->paragraph(),
            "is_check" => $this->faker->boolean(),
            "is_check_enterprise" => $this->faker->boolean(),
            "date" => $this->faker->boolean()? $this->faker->dateTimeBetween('now', '+1 years'): $this->faker->date(),
            "in_time" => $this->faker->time(),
            "in_time_confirm" => $this->faker->boolean(),
            "out_time" => $this->faker->time(),
            "out_time_confirm" => $this->faker->boolean(),
        ];
    }
}
