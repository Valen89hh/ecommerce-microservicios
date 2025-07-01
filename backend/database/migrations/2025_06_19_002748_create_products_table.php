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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            //Basic information
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('employee_id')->nullable()->constrained()->onDelete('set null'); // quien lo creó
            $table->string('name');
            $table->text('short_description');
            $table->text('full_description');

            // Price and Stock
            $table->decimal('cost_price', 10, 2);
            $table->decimal('sale_price', 10, 2);
            $table->decimal('discounted_price', 10, 2)->nullable();
            $table->decimal('stock', 10, 2);
            $table->decimal('maximun_stock', 10, 2);
            $table->decimal('minimun_stock', 10, 2);
            $table->decimal('unit_amount', 10, 2);
            $table->decimal('available_units', 10, 2);
            $table->enum('unit_measurement', ['u', 'g', 'kg', 'ml', 'l']);
            
            //Logistics Infomation
            $table->decimal('weight', 10, 2);
            $table->decimal('length', 10, 2);
            $table->decimal('width', 10, 2);
            $table->decimal('height', 10, 2);
            $table->boolean('is_perceptible')->default(false);
            $table->date('expiration_date')->nullable();
            $table->enum('storage_type', ['refrigerated', 'frozen', 'ambient', 'dry', 'supplement', 'light_protected']);
            $table->text('shipping_unit');


            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
