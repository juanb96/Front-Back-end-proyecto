package com.example.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.impl.DetalleVentaImp;
import com.example.api.models.DetalleVenta;
import com.example.api.repositorys.DetalleVentaRepository;
@Service
public class DetalleVentaService implements DetalleVentaImp{

	
	@Autowired
	private DetalleVentaRepository  detalleVentaRepo;
	@Override
	public DetalleVenta crearDetalleVenta(DetalleVenta detalleVenta) {
		return detalleVentaRepo.save(detalleVenta);
	}

	@Override
	public DetalleVenta editarDetalleVenta(DetalleVenta detalleVenta) {
		DetalleVenta detalleVentaExistente=detalleVentaRepo.findById(detalleVenta.getIdDetalleVenta()).get();
		detalleVentaExistente.setCantidad(detalleVenta.getCantidad());
		detalleVentaExistente.setPrecioUnitario(detalleVenta.getPrecioUnitario());
		detalleVentaExistente.setProducto(detalleVenta.getProducto());
		detalleVentaExistente.setVenta(detalleVenta.getVenta());
		return detalleVentaRepo.save(detalleVentaExistente);
	}

	@Override
	public String eliminarDetalleVenta(long idDetalleVenta) {
		detalleVentaRepo.deleteById(idDetalleVenta);
		return "";
	}

	@Override
	public DetalleVenta traerDetalleVenta(DetalleVenta detalleVenta) {
		
		return detalleVentaRepo.findById(detalleVenta.getIdDetalleVenta()).get();
	}

	@Override
	public List<DetalleVenta> listarDetalleVenta() {
		
		return detalleVentaRepo.findAll();
	}

}
