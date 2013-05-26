<?php

/**
 * You Witness (http://youwitness.com.au/)
 *
 * @link      http://github.com/crimsonronin/YouWitness for the canonical source repository
 */

namespace YouWitness\Controller;

use YouWitness\Controller\AbstractController;
use Zend\View\Model\JsonModel;
use YouWitness\Utils\File\Upload;
use Aws\Common\Aws;
use Aws\S3\Enum\CannedAcl;
use Aws\S3\Exception\S3Exception;

class UploadController extends AbstractController {

    private $s3;
    private $bucket;

    const S3_WEB_BUCKET = 'youwitness';

    public function create($data) {
        $this->initAws();

        $id = $_GET['dbId'];

        $dir = 'tmp/';
        $uploadDir = __DIR__ . '/../../../../../' . $dir;
        $upload = new Upload($uploadDir);

        $r = $upload->save();
        if ($r['error'] === false) {
            //save to s3
            $url = $this->saveToS3($r);
        }
        return new JsonModel([
            'error' => false,
            'fileSrc' => $url,
            'fileParent' => $id,
            'fileId' => $id,
            'fileName' => $r['fileName']
        ]);
    }

    public function delete($id) {
        $this->initAws();
        $this->removeFromS3($id);
        return new JsonModel([]);
    }

    private function initAws() {
        $config = $this->getServiceLocator()->get('Config');
        $this->bucket = $config['aws']['bucket'];
        $aws = Aws::factory([
                    'key' => $config['aws']['key'],
                    'secret' => $config['aws']['secret'],
        ]);

        $this->s3 = $aws->get('s3');
    }

    private function removeFromS3($fileName) {
        $r = $this->s3->deleteObject([
            'Bucket' => $this->bucket,
            'Key' => 'suspects/' . $fileName
        ]);
    }

    private function saveToS3($f) {
        try {
            $h = fopen($f['file'], 'r');
            $r = $this->s3->putObject([
                'Bucket' => self::S3_WEB_BUCKET,
                'Key' => 'suspects/' . $f['fileName'],
                'Body' => $h,
                'ACL' => CannedAcl::PUBLIC_READ
            ]);
            fclose($h);
            if (is_file($r['file'])) {
                unlink($r['file']);
            }
            return $r->get('ObjectURL');
        } catch (S3Exception $e) {
            echo 'The item could not be saved.';
        }
    }

}