import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
class S3Service {
    async setConfig() {
        const config = new S3Client({
            region: 'auto',
            endpoint: process.env.R2_ENDPOINT,
            credentials: {
                accessKeyId: process.env.R2_ACCESS_KEY_ID,
                secretAccessKey: process.env.R2_SECRET_ACCESS_KEY
            }
        });
        return config;
    }

    async create() {
        const config = await this.setConfig();
        const objectKey = uuidv4();

        const signedUrl = await getSignedUrl(
            config,
            new PutObjectCommand({
                Bucket: process.env.R2_BUCKET,
                Key: objectKey
            }),
            {
                expiresIn: 3600
            }
        );

        return {
            put_url: signedUrl,
            get_url: `https://${process.env.R2_BUCKET}.s3.amazonaws.com/${objectKey}`
        };
    }
}

export default new S3Service();
