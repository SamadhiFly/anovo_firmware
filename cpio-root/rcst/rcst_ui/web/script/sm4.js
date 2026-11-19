// SM4 算法实现
var key = "9225357229528045"; // 必须为16字节
function SM4Crypt() {
    // S盒
    this.SBOX = [
        0xd6, 0x90, 0xe9, 0xfe, 0xcc, 0xe1, 0x3d, 0xb7, 0x16, 0xb6, 0x14, 0xc2, 0x28, 0xfb, 0x2c, 0x05,
        0x2b, 0x67, 0x9a, 0x76, 0x2a, 0xbe, 0x04, 0xc3, 0xaa, 0x44, 0x13, 0x26, 0x49, 0x86, 0x06, 0x99,
        0x9c, 0x42, 0x50, 0xf4, 0x91, 0xef, 0x98, 0x7a, 0x33, 0x54, 0x0b, 0x43, 0xed, 0xcf, 0xac, 0x62,
        0xe4, 0xb3, 0x1c, 0xa9, 0xc9, 0x08, 0xe8, 0x95, 0x80, 0xdf, 0x94, 0xfa, 0x75, 0x8f, 0x3f, 0xa6,
        0x47, 0x07, 0xa7, 0xfc, 0xf3, 0x73, 0x17, 0xba, 0x83, 0x59, 0x3c, 0x19, 0xe6, 0x85, 0x4f, 0xa8,
        0x68, 0x6b, 0x81, 0xb2, 0x71, 0x64, 0xda, 0x8b, 0xf8, 0xeb, 0x0f, 0x4b, 0x70, 0x56, 0x9d, 0x35,
        0x1e, 0x24, 0x0e, 0x5e, 0x63, 0x58, 0xd1, 0xa2, 0x25, 0x22, 0x7c, 0x3b, 0x01, 0x21, 0x78, 0x87,
        0xd4, 0x00, 0x46, 0x57, 0x9f, 0xd3, 0x27, 0x52, 0x4c, 0x36, 0x02, 0xe7, 0xa0, 0xc4, 0xc8, 0x9e,
        0xea, 0xbf, 0x8a, 0xd2, 0x40, 0xc7, 0x38, 0xb5, 0xa3, 0xf7, 0xf2, 0xce, 0xf9, 0x61, 0x15, 0xa1,
        0xe0, 0xae, 0x5d, 0xa4, 0x9b, 0x34, 0x1a, 0x55, 0xad, 0x93, 0x32, 0x30, 0xf5, 0x8c, 0xb1, 0xe3,
        0x1d, 0xf6, 0xe2, 0x2e, 0x82, 0x66, 0xca, 0x60, 0xc0, 0x29, 0x23, 0xab, 0x0d, 0x53, 0x4e, 0x6f,
        0xd5, 0xdb, 0x37, 0x45, 0xde, 0xfd, 0x8e, 0x2f, 0x03, 0xff, 0x6a, 0x72, 0x6d, 0x6c, 0x5b, 0x51,
        0x8d, 0x1b, 0xaf, 0x92, 0xbb, 0xdd, 0xbc, 0x7f, 0x11, 0xd9, 0x5c, 0x41, 0x1f, 0x10, 0x5a, 0xd8,
        0x0a, 0xc1, 0x31, 0x88, 0xa5, 0xcd, 0x7b, 0xbd, 0x2d, 0x74, 0xd0, 0x12, 0xb8, 0xe5, 0xb4, 0xb0,
        0x89, 0x69, 0x97, 0x4a, 0x0c, 0x96, 0x77, 0x7e, 0x65, 0xb9, 0xf1, 0x09, 0xc5, 0x6e, 0xc6, 0x84,
        0x18, 0xf0, 0x7d, 0xec, 0x3a, 0xdc, 0x4d, 0x20, 0x79, 0xee, 0x5f, 0x3e, 0xd7, 0xcb, 0x39, 0x48
    ];

    // 系统参数FK
    this.FK = [0xa3b1bac6, 0x56aa3350, 0x677d9197, 0xb27022dc];

    // 固定参数CK
    this.CK = [
        0x00070e15, 0x1c232a31, 0x383f464d, 0x545b6269,
        0x70777e85, 0x8c939aa1, 0xa8afb6bd, 0xc4cbd2d9,
        0xe0e7eef5, 0xfc030a11, 0x181f262d, 0x343b4249,
        0x50575e65, 0x6c737a81, 0x888f969d, 0xa4abb2b9,
        0xc0c7ced5, 0xdce3eaf1, 0xf8ff060d, 0x141b2229,
        0x30373e45, 0x4c535a61, 0x686f767d, 0x848b9299,
        0xa0a7aeb5, 0xbcc3cad1, 0xd8dfe6ed, 0xf4fb0209,
        0x10171e25, 0x2c333a41, 0x484f565d, 0x646b7279
    ];

    // 轮密钥
    this.rk = new Array(32);
}

// 循环左移
SM4Crypt.prototype.rotl = function (x, n) {
    return ((x << n) | (x >>> (32 - n))) >>> 0;
};

// 非线性变换τ
SM4Crypt.prototype.tau = function (a) {
    return ((this.SBOX[(a >>> 24) & 0xFF] << 24) |
        (this.SBOX[(a >>> 16) & 0xFF] << 16) |
        (this.SBOX[(a >>> 8) & 0xFF] << 8) |
        (this.SBOX[a & 0xFF])) >>> 0;
};

// 线性变换L
SM4Crypt.prototype.L = function (b) {
    return (b ^ this.rotl(b, 2) ^ this.rotl(b, 10) ^ this.rotl(b, 18) ^ this.rotl(b, 24)) >>> 0;
};

// 线性变换L'
SM4Crypt.prototype.L2 = function (b) {
    return (b ^ this.rotl(b, 13) ^ this.rotl(b, 23)) >>> 0;
};

// 轮函数F
SM4Crypt.prototype.F = function (x0, x1, x2, x3, rk) {
    return (x0 ^ this.L(this.tau(x1 ^ x2 ^ x3 ^ rk))) >>> 0;
};

// 密钥扩展算法
SM4Crypt.prototype.sm4_setkey_enc = function (key) {
    var MK = new Array(4);
    var K = new Array(36);

    // 将密钥转换为4个字
    MK[0] = ((key[0] << 24) | (key[1] << 16) | (key[2] << 8) | key[3]) >>> 0;
    MK[1] = ((key[4] << 24) | (key[5] << 16) | (key[6] << 8) | key[7]) >>> 0;
    MK[2] = ((key[8] << 24) | (key[9] << 16) | (key[10] << 8) | key[11]) >>> 0;
    MK[3] = ((key[12] << 24) | (key[13] << 16) | (key[14] << 8) | key[15]) >>> 0;

    // 生成中间密钥K
    for (var i = 0; i < 4; i++) {
        K[i] = MK[i] ^ this.FK[i];
    }

    // 生成轮密钥rk
    for (var i = 0; i < 32; i++) {
        K[i + 4] = (K[i] ^ this.L2(this.tau(K[i + 1] ^ K[i + 2] ^ K[i + 3] ^ this.CK[i]))) >>> 0;
        this.rk[i] = K[i + 4];
    }
};

// 加密/解密一个分组
SM4Crypt.prototype.sm4_crypt_ecb = function (input, encrypt) {
    var X = new Array(36);

    // 将输入转换为4个字
    X[0] = ((input[0] << 24) | (input[1] << 16) | (input[2] << 8) | input[3]) >>> 0;
    X[1] = ((input[4] << 24) | (input[5] << 16) | (input[6] << 8) | input[7]) >>> 0;
    X[2] = ((input[8] << 24) | (input[9] << 16) | (input[10] << 8) | input[11]) >>> 0;
    X[3] = ((input[12] << 24) | (input[13] << 16) | (input[14] << 8) | input[15]) >>> 0;

    // 32轮迭代运算
    for (var i = 0; i < 32; i++) {
        var rk = encrypt ? this.rk[i] : this.rk[31 - i];
        X[i + 4] = this.F(X[i], X[i + 1], X[i + 2], X[i + 3], rk);
    }

    // 反序变换
    var output = new Array(16);
    output[0] = (X[35] >>> 24) & 0xFF;
    output[1] = (X[35] >>> 16) & 0xFF;
    output[2] = (X[35] >>> 8) & 0xFF;
    output[3] = X[35] & 0xFF;
    output[4] = (X[34] >>> 24) & 0xFF;
    output[5] = (X[34] >>> 16) & 0xFF;
    output[6] = (X[34] >>> 8) & 0xFF;
    output[7] = X[34] & 0xFF;
    output[8] = (X[33] >>> 24) & 0xFF;
    output[9] = (X[33] >>> 16) & 0xFF;
    output[10] = (X[33] >>> 8) & 0xFF;
    output[11] = X[33] & 0xFF;
    output[12] = (X[32] >>> 24) & 0xFF;
    output[13] = (X[32] >>> 16) & 0xFF;
    output[14] = (X[32] >>> 8) & 0xFF;
    output[15] = X[32] & 0xFF;

    return output;
};

// PKCS7填充（不使用padEnd）
function pkcs7Pad(data, blockSize) {
    var padLen = blockSize - (data.length % blockSize);
    var padded = new Array(data.length + padLen);

    // 复制原始数据
    for (var i = 0; i < data.length; i++) {
        padded[i] = data[i];
    }

    // 添加填充字节
    for (var i = data.length; i < padded.length; i++) {
        padded[i] = padLen;
    }

    return padded;
}

// PKCS7去除填充
function pkcs7Unpad(padded) {
    var padLen = padded[padded.length - 1];

    // 验证填充长度是否有效
    if (padLen < 1 || padLen > 16) {
        return padded; // 不是有效的PKCS7填充
    }

    // 验证所有填充字节是否正确
    for (var i = padded.length - padLen; i < padded.length; i++) {
        if (padded[i] !== padLen) {
            return padded; // 填充无效
        }
    }

    // 去除填充
    return padded.slice(0, padded.length - padLen);
}

// 字符串转字节数组
function stringToBytes(str) {
    var bytes = [];
    for (var i = 0; i < str.length; i++) {
        bytes.push(str.charCodeAt(i) & 0xFF);
    }
    return bytes;
}

// 字节数组转16进制字符串（不使用padStart）
function bytesToHex(bytes) {
    var hex = '';
    for (var i = 0; i < bytes.length; i++) {
        var b = bytes[i];
        hex += (b < 16 ? '0' : '') + b.toString(16);
    }
    return hex;
}

// 16进制字符串转字节数组
function hexToBytes(hex) {
    var bytes = [];
    for (var i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
}

// SM4加密函数
function sm4Encrypt(plaintext) {
    // 确保密钥为16字节
    var keyBytes = stringToBytes(key);
    while (keyBytes.length < 16) {
        keyBytes.push(0);
    }
    keyBytes = keyBytes.slice(0, 16);

    // 初始化SM4
    var sm4 = new SM4Crypt();
    sm4.sm4_setkey_enc(keyBytes);

    // 处理明文
    var plainBytes = stringToBytes(plaintext);
    plainBytes = pkcs7Pad(plainBytes, 16);

    // 分块加密
    var cipherBytes = [];
    for (var i = 0; i < plainBytes.length; i += 16) {
        var block = plainBytes.slice(i, i + 16);
        var encrypted = sm4.sm4_crypt_ecb(block, true);
        cipherBytes = cipherBytes.concat(encrypted);
    }
    console.log("加密:", plaintext, " ---> ", bytesToHex(cipherBytes));
    return bytesToHex(cipherBytes);
}

// SM4解密函数
function sm4Decrypt(ciphertext) {
    // 确保密钥为16字节
    var keyBytes = stringToBytes(key);
    while (keyBytes.length < 16) {
        keyBytes.push(0);
    }
    keyBytes = keyBytes.slice(0, 16);

    // 初始化SM4
    var sm4 = new SM4Crypt();
    sm4.sm4_setkey_enc(keyBytes); // 解密使用相同的密钥扩展

    // 处理密文
    var cipherBytes = hexToBytes(ciphertext);

    // 分块解密
    var plainBytes = [];
    for (var i = 0; i < cipherBytes.length; i += 16) {
        var block = cipherBytes.slice(i, i + 16);
        var decrypted = sm4.sm4_crypt_ecb(block, false);
        plainBytes = plainBytes.concat(decrypted);
    }

    // 去除填充
    plainBytes = pkcs7Unpad(plainBytes);

    // 转换为字符串
    var plaintext = '';
    for (var i = 0; i < plainBytes.length; i++) {
        plaintext += String.fromCharCode(plainBytes[i]);
    }
    console.log("解密:", ciphertext, " ---> ", plaintext);
    return plaintext;
}

function test() {
    // 测试
    var plaintext = "terminal";
    console.log("------------------------test1---------------------------");
    console.log("明文:", plaintext);
    var encrypted = sm4Encrypt(plaintext);
    console.log("加密:", encrypted); // 类似 a8b54bfb97b6f874f7c650bcca7s9483

    var decrypted = sm4Decrypt(encrypted, key);
    console.log("解密:", decrypted);
    console.log("结果:", decrypted === plaintext ? "成功" : "失败");


    console.log("------------------------test2---------------------------");
    var plaintext = "A0A102CT_4000";
    console.log("明文:", plaintext);
    var encrypted = sm4Encrypt(plaintext);
    console.log("加密:", encrypted); // 类似 a8b54bfb97b6f874f7c650bcca7s9483

    var decrypted = sm4Decrypt(encrypted);
    console.log("解密:", decrypted);
    console.log("结果:", decrypted === plaintext ? "成功" : "失败");
}