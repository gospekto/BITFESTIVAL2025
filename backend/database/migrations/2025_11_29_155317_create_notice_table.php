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
        Schema::create('notices', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('category');
            $table->dateTime('date');
            $table->string('description');
            $table->string('location');
            $table->string('image_path')->nullable();
            $table->uuid('organization_id');
            $table->unsignedInteger('max_people');
            $table->timestamps();
            $table->foreign('organization_id')
                ->references('id')->on('organizations')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notices');
    }
};
