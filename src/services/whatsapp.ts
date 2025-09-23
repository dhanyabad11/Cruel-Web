import { api } from "./api";

export interface WhatsAppMessage {
    message: string;
    sender: string;
    auto_create: boolean;
}

export interface WhatsAppUpload {
    file: File;
    auto_create: boolean;
}

export interface ExtractedDeadline {
    title: string;
    description: string;
    due_date: string;
    priority: string;
    confidence: number;
    sender: string;
    original_message: string;
    created_in_db?: boolean;
    reason?: string;
}

export interface WhatsAppParseResponse {
    success: boolean;
    original_message: string;
    sender: string;
    extracted_deadlines: ExtractedDeadline[];
    created_count: number;
}

export interface WhatsAppUploadResponse {
    success: boolean;
    file_name: string;
    total_extracted: number;
    auto_created: number;
    deadlines: ExtractedDeadline[];
    processing_info: {
        parser_version: string;
        extraction_timestamp: string;
        confidence_threshold: number;
    };
}

export interface WhatsAppExample {
    message: string;
    expected_extraction: {
        title: string;
        due_date: string;
        priority: string;
    };
}

export interface BulkCreateRequest {
    deadlines: Array<{
        title: string;
        description: string;
        due_date: string;
        priority: string;
        source?: string;
    }>;
}

export interface BulkCreateResponse {
    success: boolean;
    created_count: number;
    total_submitted: number;
    errors: string[];
}

export interface WhatsAppExamplesResponse {
    examples: WhatsAppExample[];
    supported_formats: string[];
    tips: string[];
}

// WhatsApp API endpoints
export const whatsappAPI = {
    parseMessage: async (data: WhatsAppMessage): Promise<WhatsAppParseResponse> => {
        const formData = new FormData();
        formData.append("message", data.message);
        formData.append("sender", data.sender);
        formData.append("auto_create", data.auto_create.toString());

        const response = await api.post("/api/whatsapp/parse-message", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    uploadChat: async (data: WhatsAppUpload): Promise<WhatsAppUploadResponse> => {
        const formData = new FormData();
        formData.append("file", data.file);
        formData.append("auto_create", data.auto_create.toString());

        const response = await api.post("/api/whatsapp/upload-chat", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    },

    getExamples: async (): Promise<WhatsAppExamplesResponse> => {
        const response = await api.get("/api/whatsapp/examples");
        return response.data;
    },

    bulkCreate: async (request: BulkCreateRequest): Promise<BulkCreateResponse> => {
        const response = await api.post("/api/whatsapp/bulk-create", request);
        return response.data;
    },
};
