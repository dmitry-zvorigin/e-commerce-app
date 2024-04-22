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
        Schema::create('product_characteristics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained();
            $table->foreignId('attribute_id')->constrained('product_attributes');
            $table->foreignId('value_id')->constrained('attribute_values');
            $table->string('is_visible')->nullable();
            $table->integer('order')->nullable();
            $table->timestamps();

            // Добавление индексов
            $table->index('product_id');
            $table->index('attribute_id');
            $table->index('value_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_characteristics');
    }
};
