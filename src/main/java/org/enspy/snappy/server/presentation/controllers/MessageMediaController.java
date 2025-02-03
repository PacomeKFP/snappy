package org.enspy.snappy.server.presentation.controllers;


// Importing required classes

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.enspy.snappy.server.domain.usecases.chat.UploadMediaUseCase;
import org.enspy.snappy.server.presentation.dto.chat.UploadMediaData;
import org.enspy.snappy.server.presentation.dto.chat.UploadMediaDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController("/media")
public class MessageMediaController {

    @Autowired
    private UploadMediaUseCase uploadMediaUseCase;

    @PostMapping(path="/upload", consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public List<String> uploadFiles( @ModelAttribute UploadMediaDto uploadMediaDto) {
        return uploadMediaUseCase.execute(uploadMediaDto);
    }

    @RequestMapping(value = "/getFiles", method = RequestMethod.GET)
    public String[] getFiles() {
        String folderPath = System.getProperty("user.dir") + "/Uploads";
        File directory = new File(folderPath);
        String[] filenames = directory.list();
        return filenames;

    }

    @RequestMapping(value = "/download/{path:.+}", method = RequestMethod.GET)
    public ResponseEntity downloadFile(@PathVariable("path") String filename) throws FileNotFoundException {

        String fileUploadpath = System.getProperty("user.dir") + "/Uploads";
        String[] filenames = this.getFiles();
        boolean contains = Arrays.asList(filenames).contains(filename);
        if (!contains) {
            return new ResponseEntity("FIle Not Found", HttpStatus.NOT_FOUND);
        }
        String filePath = fileUploadpath + File.separator + filename;

        File file = new File(filePath);

        InputStreamResource resource = new InputStreamResource(new FileInputStream(file));

        HttpHeaders headers = new HttpHeaders();
        String contentType = "application/octet-stream";
        String headerValue = "attachment; filename=\"" + resource.getFilename() + "\"";

        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION, headerValue)
                .body(resource);
    }
}
