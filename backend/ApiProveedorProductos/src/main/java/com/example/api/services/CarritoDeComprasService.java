package com.example.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.api.models.CarritoDeCompras;
import com.example.api.repositorys.CarritoDeComprasRepository;
@Service
public class CarritoDeComprasService implements com.example.api.impl.CarritoDeComprasImpl{

	@Autowired
	private CarritoDeComprasRepository carritoDeComprasRepo;
	@Override
	public CarritoDeCompras crearCarritoDeCompras(CarritoDeCompras carritoDeCompras) {
		
		return carritoDeComprasRepo.save(carritoDeCompras);
	}

	@Override
	public CarritoDeCompras editarCarritoDeCompras(CarritoDeCompras carritoDeCompras) {
		CarritoDeCompras carritoexistente = carritoDeComprasRepo.findById(carritoDeCompras.getIdCarrito()).get();
		carritoexistente.setFechaDeCreacion(carritoDeCompras.getFechaDeCreacion());
		return carritoDeComprasRepo.save(carritoexistente);
	}

	@Override
	public String eliminarCarritoDeCompras(long idCarritoDeCompras) {
		boolean existeCarritoCompras = carritoDeComprasRepo.existsById(idCarritoDeCompras);
		if (existeCarritoCompras==true) {
			carritoDeComprasRepo.deleteById(idCarritoDeCompras);
			return"eliminado";
		} else {
			return "no se encuentra el id";
		}
	}

	@Override
	public List<CarritoDeCompras> listarCarritoDeCompras() {
		return carritoDeComprasRepo.findAll();
	}

	
}
