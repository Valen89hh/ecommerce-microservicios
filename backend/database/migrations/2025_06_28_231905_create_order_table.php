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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            // Cliente que realizó el pedido (si aplica, puede ser nullable para compras anónimas)
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');

            // Información de envío
            $table->string('recipient_name');
            $table->string('recipient_phone');
            $table->string('recipient_email');
            $table->string('shipping_address');
            $table->string('shipping_city');
            $table->string('shipping_region')->nullable();
            $table->string('shipping_zip')->nullable();
            $table->string('shipping_country')->default('PE');

            // Método de pago
            $table->enum('payment_method', ['mercado_pago', 'oxa_pay']);
            $table->boolean('is_paid')->default(false);
            $table->decimal('total_amount', 10, 2);

            // Estado del pedido
            $table->enum('status', ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled'])->default('pending');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
