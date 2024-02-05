package com.example.api.impl;

import java.util.List;

import com.example.api.models.DetallesDeOrdenDeVenta;

public interface DetallesDeOrdenDeVentaImp {
	
	public DetallesDeOrdenDeVenta crearDetallesDeOrdenDeVenta(DetallesDeOrdenDeVenta detallesDeOrdenDeVenta);
	public DetallesDeOrdenDeVenta editarDetallesDeOrdenDeVenta(DetallesDeOrdenDeVenta detallesDeOrdenDeVenta);
	public String eliminarDetallesDeOrdenDeVenta(long idDetallesDeOrdenDeVenta);
	public DetallesDeOrdenDeVenta traerDetallesDeOrdenDeVenta(DetallesDeOrdenDeVenta detallesDeOrdenDeVenta);
	public List<DetallesDeOrdenDeVenta>listarDetallesDeOrdenDeVenta();

}
