<?php

namespace YouWitness\Utils\File\Image;

use \Imagick;
use YouWitness\Utils\File\Image\ContentAware;

class Image {

    private function getFileExtension($file) {
        return pathinfo($file, PATHINFO_EXTENSION);
    }

    public function createScaledImage($file, $scale_dir, $max_width = 120, $max_height = 120, $force_max = false) {
        list($img_width, $img_height) = @array_values($this->getImageSize($file));

        if (!$img_width || !$img_height) {
            return false;
        }
        $scale = min($max_width / $img_width, $max_height / $img_height);
        if ($scale > 1) {
            $scale = 1;
        }
        if ($force_max === true) {
            $new_width = $max_width;
            $new_height = $max_height;
        } else {
            $new_width = intval(ceil($img_width * $scale));
            $new_height = intval(ceil($img_height * $scale));
        }

        $ext = $this->getFileExtension($file);
        $new_file_name = randString(40) . '_' . $max_width . 'x' . $max_height . '_' . time() . '.' . $ext;
        $new_file_path = $scale_dir . $new_file_name;

        $new_img = @imagecreatetruecolor($new_width, $new_height);
        switch ($ext) {
            case 'jpg' :
            case 'jpeg' :
                $src_img = @imagecreatefromjpeg($file);
                $write_image = 'imagejpeg';
                break;
            case 'gif' :
                @imagecolortransparent($new_img, @imagecolorallocate($new_img, 0, 0, 0));
                $src_img = @imagecreatefromgif($file);
                $write_image = 'imagegif';
                break;
            case 'png' :
                @imagecolortransparent($new_img, @imagecolorallocate($new_img, 0, 0, 0));
                @imagealphablending($new_img, false);
                @imagesavealpha($new_img, true);
                $src_img = @imagecreatefrompng($file);
                $write_image = 'imagepng';
                break;
            default :
                $src_img = $image_method = null;
        }
        $success = $src_img && @imagecopyresampled($new_img, $src_img, 0, 0, 0, 0, $new_width, $new_height, $img_width, $img_height) && $write_image($new_img, $new_file_path);
        // Free up memory (imagedestroy does not delete files):
        @imagedestroy($src_img);
        @imagedestroy($new_img);

        if ($success === true) {
            return $new_file_name;
        } else {
            return false;
        }
    }

    public function createImageMagickScaledImage($file, $scale_dir, $max_width = 120, $max_height = 120, $force_ratio = false) {

        $ext = $this->getFileExtension($file);
        $imageSize = getimagesize($file);

        if (empty($max_height)) {
            $max_height = ($max_width / $imageSize[0]) * $imageSize[1];
        } else if (empty($max_width)) {
            $max_width = ($max_height / $imageSize[1]) * $imageSize[0];
        }

        $new_file_name = generateHash($file) . '_' . $max_width . 'x' . $max_height . '.' . $ext;
        $new_file_path = $scale_dir . $new_file_name;

        if ($force_ratio === true) {
            $aware = new ContentAware();
            $image = $aware->crop($file, $max_width, $max_height, $ext, 85);
            if (!$image) {
                return false;
            } else {
                $image->writeImage($new_file_path);
            }
        } else {
            $new_image = new Imagick($file);
            switch ($ext) {
                case 'jpg' :
                case 'jpeg' :
                    $new_image->setImageCompression(Imagick::COMPRESSION_JPEG);
                    $new_image->setImageCompressionQuality(85);
                    $new_image->setInterlaceScheme(Imagick::INTERLACE_PLANE);
                    break;
                case 'gif' :
                    break;
                case 'png' :
                    break;
                default :
                    $src_img = $image_method = null;
            }

            $new_image->stripImage();
            $new_image->setImageResolution(72, 72);
            $new_image->resizeImage($max_width, $max_height, Imagick::FILTER_CATROM, 1, true);
            $new_image->gaussianBlurImage(0.05, 0);
            $new_image->writeImage($new_file_path);
            $new_image->destroy();
        }

        if (is_file($new_file_path)) {
            //if png optimize further
            if ($ext == 'png') {
                //exec("optipng -o5 {$new_file_path}");
                //exec("/etc/init.d/pngcrush -rem gAMA -rem cHRM -rem iCCP -rem sRGB -brute -l 9 -max -reduce -m 0 -q {$new_file_path} {$new_file_path}");
            }
            return $new_file_name;
        } else {
            return false;
        }
    }

}