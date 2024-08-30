const { RoleTemplateAssignments } = require('../models');

// Get all role template assignments
exports.getAllRoleTemplateAssignments = async (req, res) => {
    try {
        const assignments = await RoleTemplateAssignments.findAll();
        res.json(assignments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching role template assignments', error: error.message });
    }
};

// Get a specific role template assignment by ID
exports.getRoleTemplateAssignmentById = async (req, res) => {
    try {
        const assignment = await RoleTemplateAssignments.findByPk(req.params.id);
        if (!assignment) {
            return res.status(404).json({ message: 'Role template assignment not found' });
        }
        res.json(assignment);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching role template assignment', error: error.message });
    }
};

// Create a new role template assignment
exports.createRoleTemplateAssignment = async (req, res) => {
    try {
        const newAssignment = await RoleTemplateAssignments.create(req.body);
        res.status(201).json(newAssignment);
    } catch (error) {
        res.status(400).json({ message: 'Error creating role template assignment', error: error.message });
    }
};

// Update an existing role template assignment
exports.updateRoleTemplateAssignment = async (req, res) => {
    try {
        const [updated] = await RoleTemplateAssignments.update(req.body, {
            where: { id: req.params.id }
        });
        if (!updated) {
            return res.status(404).json({ message: 'Role template assignment not found' });
        }
        const updatedAssignment = await RoleTemplateAssignments.findByPk(req.params.id);
        res.json(updatedAssignment);
    } catch (error) {
        res.status(400).json({ message: 'Error updating role template assignment', error: error.message });
    }
};

// Delete a role template assignment
exports.deleteRoleTemplateAssignment = async (req, res) => {
    try {
        const deleted = await RoleTemplateAssignments.destroy({
            where: { id: req.params.id }
        });
        if (!deleted) {
            return res.status(404).json({ message: 'Role template assignment not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting role template assignment', error: error.message });
    }
};
