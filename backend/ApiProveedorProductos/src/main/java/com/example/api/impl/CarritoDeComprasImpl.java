package com.example.api.impl;

import java.util.List;

import com.example.api.models.CarritoDeCompras;

public interface CarritoDeComprasImpl {

	public CarritoDeCompras crearCarritoDeCompras(CarritoDeCompras carritoDeCompras);
	public CarritoDeCompras editarCarritoDeCompras(CarritoDeCompras carritoDeCompras);
	public String eliminarCarritoDeCompras(long idCarritoDeCompras);
	List<CarritoDeCompras>listarCarritoDeCompras();
}
