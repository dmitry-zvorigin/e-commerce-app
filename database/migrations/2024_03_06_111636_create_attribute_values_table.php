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
        Schema::create('attribute_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('attribute_id')->constrained('product_attributes');
            $table->string('value_string')->nullable();
            // $table->integer('value_int')->nullable();
            // $table->decimal('value_int', 8, 2)->nullable();
            $table->float('value_int')->nullable();
            $table->string('unit_type')->nullable();
            // $table->string('slug');
            $table->timestamps();

            $table->index('attribute_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('attribute_values');
    }
};
