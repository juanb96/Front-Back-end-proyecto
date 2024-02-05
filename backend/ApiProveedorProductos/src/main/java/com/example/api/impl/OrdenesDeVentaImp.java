package com.example.api.impl;

import java.util.List;

import com.example.api.models.OrdenesDeVenta;

public interface OrdenesDeVentaImp {
	
	public OrdenesDeVenta crearOrdenesDeVenta(OrdenesDeVenta ordenesDeVenta);
	public OrdenesDeVenta editarOrdenesDeVenta(OrdenesDeVenta ordenesDeVenta);
	public String eliminarOrdenesDeVenta(long idOrdenesDeVenta);
	public OrdenesDeVenta traerOrdenesDeVenta(OrdenesDeVenta ordenesDeVenta);
	public List<OrdenesDeVenta>listarOrdenesDeVenta();

}
