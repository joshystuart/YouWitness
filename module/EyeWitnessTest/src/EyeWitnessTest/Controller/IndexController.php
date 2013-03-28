<?php
/**
 * You Witness (http://youwitness.com.au/)
 *
 * @link      http://github.com/crimsonronin/YouWitness for the canonical source repository
 */

namespace Crx\EyeWitnessTest\Controller;

use Zend\Mvc\Controller\AbstractActionController;
use Zend\View\Model\ViewModel;

class IndexController extends AbstractActionController
{
    public function indexAction()
    {
        return new ViewModel();
    }
}
