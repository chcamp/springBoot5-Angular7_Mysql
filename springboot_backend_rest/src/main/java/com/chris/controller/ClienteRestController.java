package com.chris.controller;

import java.util.Date;		
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.exception.DataException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.chris.models.entity.Cliente;
import com.chris.models.service.ClienteServiceImpl;
import com.chris.models.service.IClienteService;

/*
 * Esta es una prueba de Pull en GITHUB 14 Abril  2019
 * 
 * */

@CrossOrigin(origins = {"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class ClienteRestController {
	
	@Autowired
	private IClienteService clienteServiceImpl;
	
	@GetMapping("/clientes")
	public List<Cliente> index(){
		return clienteServiceImpl.findAll();
	}
	
	@GetMapping("/clientes/{id}")
	public ResponseEntity<?> mostrarXId(@PathVariable Long id) {
		Cliente cliente = null;
		Map<String, Object> response = new HashMap<>();
		
		//manejanos errores de tipo conexion sql de exeption:
		try {
			//intenta ejecutar buscando cliente por id
			cliente = clienteServiceImpl.findById(id);
		} catch (DataAccessException e) {
			
				response.put("mensaje","Error al realizar la consulta en la base de datos");
				response.put("error",e.getMessage().concat(": ")
						.concat(e.getMostSpecificCause().getMessage()));
				return new ResponseEntity<Map<String, Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}		
		
		//si cliente = null lo manejamos con una arreglo prtecido a tabla HashMap<>
		if(cliente == null) {
			response.put("mensaje","El cliente con id: "
				.concat(id.toString()).concat(" no existe en la base de datos."));
			
			return new ResponseEntity<Map<String, Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<Cliente>(cliente, HttpStatus.OK);		
	}
	
	
	@PostMapping("/clientes")
	public ResponseEntity<?> crear(@RequestBody Cliente cliente) {
		Cliente clienteNuevo = null;
		Map<String, Object> response = new HashMap<>();
		
		try {
			clienteNuevo =  clienteServiceImpl.save(cliente);
		} catch (DataAccessException e) {
			response.put("mensaje","Error al realizar el insert en la base de datos");
			response.put("error",e.getMessage().concat(": ")
					.concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}		
		
		//manda un mensaje al cliente que de objeto se ha insrtado con exito
		response.put("mensaje", "El cliente ha sido creado con exito!");
		//tenemso que retornar el clienteNuevo tambien
		response.put("cliente",clienteNuevo);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);  
	}
	
	@PutMapping("/clientes/{id}")
	public ResponseEntity<?> update(@RequestBody Cliente cliente,@PathVariable Long id) { 
		//aca busca la fila por id y lo guarda en clienteActual.
		Cliente clienteActual = clienteServiceImpl.findById(id);		
		Cliente clienteUpdate = null;		
		Map<String, Object> response = new HashMap<>();		
		//si cliente = null lo manejamos con una arreglo prtecido a tabla HashMap<>
		
				if(clienteActual == null) {
					response.put("mensaje","Error: no se pude editar. El cliente con id: "
						.concat(id.toString()).concat(" no existe en la base de datos."));
					
					return new ResponseEntity<Map<String, Object>>(response,HttpStatus.NOT_FOUND);
				}
		try {
		clienteActual.setApellido(cliente.getApellido());
		clienteActual.setNombre(cliente.getNombre());
		clienteActual.setEmail(cliente.getEmail());
		clienteActual.setCreateAt(cliente.getCreateAt());
		//en JPA un merge es como decir un update 
		
		clienteUpdate = clienteServiceImpl.save(clienteActual);
		
		}catch (DataAccessException e) {
			response.put("mensaje","Error al actualizar el cliente en la base de datos");
			response.put("error",e.getMessage().concat(": ")
					.concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		//manda un mensaje al cliente que de objeto se ha insrtado con exito
				response.put("mensaje", "El cliente ha sido actualizado con exito!");
				//tenemso que retornar el clienteNuevo tambien
				response.put("cliente",clienteUpdate);
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.CREATED);
		
	}
	
	@DeleteMapping("/clientes/{id}")
	public ResponseEntity<?> delete(@PathVariable Long id) {		
		Map<String, Object> response = new HashMap<>();		
		
		try {
		clienteServiceImpl.delete(id);
		}catch (DataAccessException e) {
			response.put("mensaje","Error al eliminar el cliente en la base de datos");
			response.put("error",e.getMessage().concat(": ")
					.concat(e.getMostSpecificCause().getMessage()));
			return new ResponseEntity<Map<String, Object>>(response,HttpStatus.INTERNAL_SERVER_ERROR);
		}
		response.put("mensaje", "El cliente ha sido eliminado con exito!");
		return new ResponseEntity<Map<String, Object>>(response, HttpStatus.OK);
	}
}



