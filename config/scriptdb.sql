CREATE DATABASE dbcarros;
USE dbcarros;

CREATE TABLE marcas (
    idmarca INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    CONSTRAINT uk_nombre_marca UNIQUE (nombre)
) ENGINE = INNODB;

CREATE TABLE modelos (
    idmodelo INT AUTO_INCREMENT PRIMARY KEY,
    idmarca INT NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    anio INT NOT NULL,
    CONSTRAINT fk_id_marca_modelo FOREIGN KEY (idmarca) REFERENCES marcas(idmarca) ON DELETE RESTRICT
) ENGINE = INNODB;

-- Insertar datos de prueba para marcas
INSERT INTO marcas (nombre) VALUES
    ('Toyota'),
    ('Ford'),
    ('Tesla');

-- Insertar datos de prueba para modelos
INSERT INTO modelos (idmarca, nombre, anio) VALUES
    (1, 'Corolla', 2022),
    (2, 'Mustang', 2023),
    (3, 'Model 3', 2024);

-- Consulta para verificar los datos de marcas
SELECT * FROM marcas;

-- Consulta para verificar los datos de modelos con la marca correspondiente
SELECT 
    m.idmodelo,
    ma.nombre AS marca,
    m.nombre,
    m.anio
FROM modelos m
INNER JOIN marcas ma ON m.idmarca = ma.idmarca;