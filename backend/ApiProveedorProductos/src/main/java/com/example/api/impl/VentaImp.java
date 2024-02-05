package com.example.api.impl;

import java.util.List;

import com.example.api.models.Venta;

public interface VentaImp {

	public Venta crearVenta(Venta venta);
	public Venta editarVenta(Venta venta);
	public String eliminarVenta(long idVenta);
	public Venta traerVenta(Venta venta);
	public List<Venta>listarVentas();
}
