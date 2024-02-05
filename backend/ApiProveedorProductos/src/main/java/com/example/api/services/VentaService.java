package com.example.api.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.impl.VentaImp;
import com.example.api.models.Venta;
import com.example.api.repositorys.VentaRepository;

@Service
public class VentaService implements VentaImp {

    @Autowired
    private VentaRepository ventaRepository;


    public Venta crearVenta(Venta venta) {
        return ventaRepository.save(venta);
    }

    public Venta editarVenta(Venta venta) {
    	Venta ventaExistente = ventaRepository.findById(venta.getIdVenta()).get();
    	ventaExistente.setFechaDeVenta(venta.getFechaDeVenta());
    	return ventaRepository.save(ventaExistente);
    }

    public String eliminarVenta(long idVenta) {
        ventaRepository.deleteById(idVenta);
        return "Venta eliminada correctamente";
    }

    public Venta traerVenta(Venta venta) {
        return ventaRepository.findById(venta.getIdVenta()).get();
    }

    public List<Venta> listarVentas() {
        return ventaRepository.findAll();
    }
}
