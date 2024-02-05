package com.example.api.implementaciones;

import java.util.List;

import com.example.api.modelos.Modelo;

public interface ModeloImp {
	
	public Modelo crearModelo(Modelo modelo);
	public Modelo editarModelo(Modelo modelo);
	public String eliminarModelo(Long modelo);
	public Modelo traerModelo(Modelo modelo);
	public List<Modelo>traerModelos();

}
