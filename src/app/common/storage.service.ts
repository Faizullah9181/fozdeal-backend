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

    async create(data) {
        const config = await this.setConfig();
        const user_id = data.user_id.toString();
        const objectKey = `${user_id}/${uuidv4()}`;

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
            get_url: `${process.env.R2_PUBLIC_URL}/${objectKey}`
        };
    }
}

export default new S3Service();
