<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->text("description");
            $table->boolean("is_check")->default(false);
            $table->boolean("is_check_enterprise")->default(false);

            $table->date('date');

            $table->time('in_time');
            $table->boolean('in_time_confirm')->default(false);

            $table->time('out_time');
            $table->boolean('out_time_confirm')->default(false);

            $table->unsignedBigInteger('enterprise_id');
            $table->foreign('enterprise_id')
                  ->references('id')
                  ->on('enterprises')
                  ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
