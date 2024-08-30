const { CateringOrderAssignment } = require('../models');

exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await CateringOrderAssignment.findAll({ where: { clientId: req.user.clientId } });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignments', error: error.message });
  }
};

exports.createAssignment = async (req, res) => {
  try {
    const newAssignment = await CateringOrderAssignment.create({ ...req.body, clientId: req.user.clientId });
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(400).json({ message: 'Error creating assignment', error: error.message });
  }
};

exports.getAssignment = async (req, res) => {
  try {
    const assignment = await CateringOrderAssignment.findOne({ 
      where: { id: req.params.id, clientId: req.user.clientId }
    });
    if (assignment) {
      res.json(assignment);
    } else {
      res.status(404).json({ message: 'Assignment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching assignment', error: error.message });
  }
};

exports.updateAssignment = async (req, res) => {
  try {
    const [updated] = await CateringOrderAssignment.update(req.body, {
      where: { id: req.params.id, clientId: req.user.clientId }
    });
    if (updated) {
      const updatedAssignment = await CateringOrderAssignment.findOne({ where: { id: req.params.id } });
      res.json(updatedAssignment);
    } else {
      res.status(404).json({ message: 'Assignment not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Error updating assignment', error: error.message });
  }
};

exports.deleteAssignment = async (req, res) => {
  try {
    const deleted = await CateringOrderAssignment.destroy({
      where: { id: req.params.id, clientId: req.user.clientId }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Assignment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting assignment', error: error.message });
  }
};
