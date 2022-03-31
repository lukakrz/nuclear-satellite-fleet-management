<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('satellites', function (Blueprint $table) {
            $table->id();
            $table->string('side_number');
            $table->string('manufacturer');
            $table->string('model');
            $table->string('current_version');
            $table->year('year');
            $table->date('lanuched_at');
            $table->integer('ammount_ammo');
            $table->integer('orbit_altitude');
            $table->boolean('is_ai')->default(false);
            $table->date('created_at');
            $table->date('updated_at');
            $table->integer('user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('satellites');
    }
};
