import { Injectable } from '@nestjs/common';
import { environment } from '@avengers-game-guide/shared/environments'
import { FormRecognizerClient, AzureKeyCredential, RecognizedForm } from '@azure/ai-form-recognizer'
import { File } from '../../types/file';
import { MLModel } from './models';

@Injectable()
export class MLService {
    private client: FormRecognizerClient;

    constructor() {
        this.client = new FormRecognizerClient(
            'https://aveengersgg-gear-recognizer.cognitiveservices.azure.com',
            new AzureKeyCredential('47af3e805ba449d68d1dfffceb74477d')
        );
    }

    async processImage(file: File, mlModel: MLModel): Promise<RecognizedForm> {
        const poller = await this.client.beginRecognizeCustomForms(mlModel, file.buffer);
        const forms = await poller.pollUntilDone();

        console.log(forms[0])

        return forms[0]
    }
}
