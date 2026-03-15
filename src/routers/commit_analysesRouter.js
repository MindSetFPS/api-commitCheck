const {Router} = require('express');
const router = Router();
const {
    getCommitAnalyses, 
    getCommitAnalysisById, 
    createCommitAnalysis, 
    updateCommitAnalysis, 
    deleteCommitAnalysis
} = require('../controllers/commit_analysesControllers');

router.get('/', getCommitAnalyses);
router.get('/:id', getCommitAnalysisById);
router.post('/', createCommitAnalysis);
router.put('/:id', updateCommitAnalysis);
router.delete('/:id', deleteCommitAnalysis);

module.exports = router;