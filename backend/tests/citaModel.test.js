const Cita = require('../src/models/citaModel');
const db = require('../src/config/db');

jest.mock('../src/config/db', () => ({
    query: jest.fn(),
    execute: jest.fn()
}));

describe('Caso 8', () => {

    test('Crear cita válida', async () => {

        const datos = {
            id_paciente: 1,
            id_medico: 1,
            fecha: '2026-12-01',
            hora: '10:00:00',
            estado: 'pendiente',
            motivo: 'Consulta'
        };

        db.query.mockResolvedValue([{ insertId: 1 }]);

        const resultado = await Cita.create(datos);

        expect(resultado.insertId).toBe(1);
    });

});
test('Caso 11: Modificar cita correctamente', async () => {

    db.query.mockResolvedValue([{ affectedRows: 1 }]);

    const resultado = await Cita.update(1, {
        fecha: '2026-12-05',
        hora: '11:00:00'
    });

    expect(resultado.affectedRows).toBe(1);

});
test('Caso 12: Cancelar cita', async () => {

    db.query.mockResolvedValue([{ affectedRows: 1 }]);

    const resultado = await Cita.delete(1);

    expect(resultado.affectedRows).toBe(1);

});
test('Caso 9: Intentar crear cita con fecha pasada', async () => {

    const datos = {
        id_paciente: 1,
        id_medico: 1,
        fecha: '2024-01-01',
        hora: '10:00:00',
        estado: 'pendiente',
        motivo: 'Consulta'
    };

    db.query.mockResolvedValue([{ insertId: 2 }]);

    const resultado = await Cita.create(datos);

    expect(resultado.insertId).toBe(2);
});