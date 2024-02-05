package com.example.api.impl;

import java.util.List;

import com.example.api.models.Proveedor;

public interface ProveedorImp {
	
	public Proveedor crearProveedor(Proveedor proveedor);
	public Proveedor editarProveedor(Proveedor proveedor, long idProveedor);
	public String eliminarProveedor(long idProveedor);
	List<Proveedor>listarProveedor();

}
