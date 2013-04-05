<?php

namespace YouWitness\Utils\File;

use \stdClass;

class Upload {

    private $numWrittenBytes = 0;
    private $fileName = null;
    private $variations = array();
    private $uploadDir;
    private $uploadSrcDir;
    private $fk_id;
    private $fk_table;

    public function __construct($uploadDir, $uploadSrcDir = null) {
        $this->uploadDir = $uploadDir;
        $this->uploadSrcDir = $uploadSrcDir;
    }

    /**
     * Delete uploaded file.
     * @param string $file file name
     * @param string $dir upload directory
     * @return void
     */
    public function deleteFromFileName($file) {
        $protocol = $_SERVER["SERVER_PROTOCOL"];
        if (is_file($this->uploadDir . $file)) {
            $r = unlink($this->uploadDir . $file);
            if ($r) {
                header($protocol . ' 200 OK');
                echo json_encode(array('error' => false, 'message' => 'File deleted.'));
                exit();
            } else {
                header($protocol . '500 Internal Server Error');
                echo json_encode(array('error' => true, 'message' => 'Deleting failed'));
                exit();
            }
        } else {
            header($protocol . ' 404 Not Found');
            echo json_encode(array('error' => true, 'message' => 'File does not exist.'));
            exit();
        }
    }

    /**
     * Save uploaded file to disk.
     * Note: In this demo files are not written to disk. You have to uncomment the corresponding lines.
     * @param string dir upload directory
     * @param bool $append append to file (resume)
     * @return void
     */
    public function save() {
        $headers = getallheaders();
        $protocol = $_SERVER["SERVER_PROTOCOL"];

        if (!isset($headers['Content-Length'])) {
            return [
                'error' => true,
                'message' => 'Header \'Content-Length\' not set.'
            ];
        }

        if (isset($headers['X-File-Size'], $headers['X-File-Name'])) {
            $file = new stdClass();
            $file->name = uniqid() . '.' . pathinfo($headers['X-File-Name'], PATHINFO_EXTENSION);

            $file->size = preg_replace('/\D*/', '', $headers['X-File-Size']);

            $maxUpload = $this->getBytes(ini_get('upload_max_filesize'));
            $maxPost = $this->getBytes(ini_get('post_max_size'));
            $memoryLimit = $this->getBytes(ini_get('memory_limit'));
            $limit = min($maxUpload, $maxPost, $memoryLimit);

            if ($headers['Content-Length'] > $limit) {
                return [
                    'error' => true,
                    'message' => 'File size to big. Limit is ' . $limit . ' bytes.'
                ];
            }
            $this->fileName = $file->name;
            $file->content = file_get_contents("php://input");

            if (mb_strlen($file->content) > $limit) {
                return [
                    'error' => true,
                    'message' => 'Nice try'
                ];
            }

            $this->numWrittenBytes = file_put_contents($this->uploadDir . $file->name, $file->content);

            //save variations

            if ($this->numWrittenBytes !== false) {
                if (!empty($this->fk_id)) {
                    $r = $this->saveToDatabase($file->name);

                    header($protocol . ' 201 Created');
                    if ($r['error'] === false) {
                        return [
                            'error' => false,
                            'variations' => $r['variations'],
                            'message' => 'Uploaded file'
                        ];
                    } else {
                        return [
                            'error' => true,
                            'file' => $this->uploadDir . $file->name,
                            'fileName' => $file->name,
                            'fileSrc' => $this->uploadSrcDir . $file->name,
                            'message' => 'Could not upload file'
                        ];
                    }
                    exit();
                } else {
                    return [
                        'error' => false,
                        'file' => $this->uploadDir . $file->name,
                        'fileName' => $file->name,
                        'fileSrc' => $this->uploadSrcDir . $file->name,
                        'message' => 'Uploaded file'
                    ];
                }
            } else {
                return [
                    'error' => true,
                    'message' => 'Error writing file'
                ];
            }
        } else {
            return [
                'error' => true,
                'message' => 'Correct headers are not set'
            ];
        }
    }

    public function getBytes($val) {
        $val = trim($val);
        $last = strtolower($val[strlen($val) - 1]);
        switch ($last) {
            // The 'G' modifier is available since PHP 5.1.0
            case 'g':
                $val *= 1024;
            case 'm':
                $val *= 1024;
            case 'k':
                $val *= 1024;
        }
        return $val;
    }

}

