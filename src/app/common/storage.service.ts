const AWS = require('aws-sdk');

class AWSStorageService {
    async uploadToS3(
        bucket: string,
        body: string,
        key: string,
        uploadPath,
        config = {
            region: process.env.AWS_REGION || 'ap-south-1'
        }
    ) {
        // Configure AWS SDK
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_KEY,
            region: config.region
        });

        // Create S3 instance
        const s3 = new AWS.S3();

        try {
            // Upload to S3
            const response = await s3
                .upload({
                    Bucket: bucket || process.env.AWS_PUBLIC_BUCKET,
                    uploadPath,
                    Key: key,
                    Body: body
                })
                .promise();

            return response;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new AWSStorageService();
