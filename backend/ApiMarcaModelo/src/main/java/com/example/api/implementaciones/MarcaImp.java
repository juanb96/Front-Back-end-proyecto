package com.example.api.implementaciones;

import java.util.List;

import com.example.api.modelos.Marca;

public interface MarcaImp {
	
	
	public Marca crearMarca(Marca marca);
	public Marca editarMarca(Marca marca);
	public String eliminarMarca(Long marca);
	public Marca traerMarca(Marca marca);
	public List<Marca>traerMarcas();

}
