DROP DATABASE if EXISTS myreport;
CREATE database if not EXISTS myreport;
use myreport;

--ROLES
CREATE TABLE role (
    role_id INT(12) NOT NULL AUTO_INCREMENT,
    role_name VARCHAR(120) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(role_name),
    PRIMARY KEY(role_id)
)

INSERT INTO role (role_name)
VALUES
('admin'),
('moderator'),
('user');

--DEPARTMENT
CREATE TABLE department (
    department_id INT(12) NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(120) NOT NULL,
    department_status BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(department_name),
    PRIMARY KEY(department_id)
);

INSERT INTO department (department_name)
VALUES
('aduana'),
('auditoria'),
('compras'),
('contabilidad'),
('creditos y cobros'),
('cumplimiento'),
('entrega vehiculos'),
('finanzas'),
('gerencia general'),
('gestion humana'),
('informatica'),
('placas y matriculas'),
('presidencia'),
('repuestos'),
('repuestos suc. santiago'),
('seguridad'),
('seguridad suc. santiago'),
('serv. generales suc. santiago'),
('serv. taller sto. dgo. lexus'),
('serv. taller sto. dgo. toyota'),
('servicios generales'),
('servicios generales lexus'),
('servicios taller suc. santiago'),
('sucursal santiago'),
('taller lexus'),
('taller sto. dgo. toyota'),
('taller suc. santiago'),
('vehiculos lexus'),
('vehiculos suc. santiago'),
('vehiculos toyota');

SELECT * FROM department;

TRUNCATE TABLE department;

DROP TABLE department;

--USER
CREATE TABLE if not EXISTS user (
    user_id INT(12) NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(120) NOT NULL,
    user_email VARCHAR(120) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_status BOOLEAN DEFAULT true,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    department_id INT(12),
    role_id INT(12) DEFAULT 1,
    PRIMARY KEY(user_id),
    UNIQUE(user_email),
    Foreign Key (role_id) REFERENCES role(role_id),
    Foreign Key (department_id) REFERENCES department(department_id)
);

select * from user where user_name = '' and user_password = 'anything' or 'x' = 'x';

INSERT INTO user (user_name, user_email, user_password, department_id, role_id)
VALUES ('Roger Herrera', 'roger1210@live.com', '123456', 
(SELECT department_id FROM department WHERE department_name = 'informatica'), 
(SELECT role_id FROM role WHERE role_name = 'admin'));

SELECT * FROM user;

TRUNCATE TABLE user;

DROP TABLE user;

--REPORT
-- !change the fied priority to #
CREATE TABLE report (
    report_id INT(12) NOT NULL AUTO_INCREMENT,
    report_description TEXT(255) DEFAULT NULL,
    report_priority INT(12) NOT NULL DEFAULT 1,
    report_done BOOLEAN DEFAULT FALSE,
    report_status BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    user_id INT(12),
    CHECK (report_priority <= 3 AND report_priority >= 1),
    PRIMARY KEY(report_id),
    Foreign Key (user_id) REFERENCES user(user_id)
);


INSERT INTO report 
(report_description, report_priority, user_id)
SELECT 'My monitor is flashing porn.', 3, user_id
FROM user
WHERE user_email = 'roger1210@live.com'; 

SELECT * FROM report;

TRUNCATE TABLE report;

DROP TABLE report;



