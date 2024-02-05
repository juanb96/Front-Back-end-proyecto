package com.example.api.services;

import java.util.List;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.api.impl.ImagenImp;
import com.example.api.models.Imagen;
import com.example.api.models.Producto;
import com.example.api.repositorys.ImagenRepository;

@Service
public class ImagenServices implements ImagenImp {

	
	@Autowired
    private ImagenRepository imagenRepository;

    @Override
    public Imagen crearImagen(Imagen imagen) {
        return imagenRepository.save(imagen);
    }

    @Override
    public Imagen editarImagen(Imagen imagen) {
        Imagen imagenEncontrada = imagenRepository.findById(imagen.getIdImagen()).get();
        imagenEncontrada.setProducto(imagen.getProducto());
        imagenEncontrada.setUrlImagen(imagen.getUrlImagen());
            return imagenRepository.save(imagenEncontrada);
        }

    

    @Override
    public String eliminarImagen(long idImagen) {
        Optional<Imagen> imagenEncontrada = imagenRepository.findById(idImagen);
        if (imagenEncontrada.isPresent()) {
            imagenRepository.delete(imagenEncontrada.get());
            return "Imagen eliminada correctamente";
        }
        return "La imagen no existe";
    }

    @Override
    public List<Imagen> listarImagen() {
        return imagenRepository.findAll();
    }


}
