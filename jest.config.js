module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    rootDir: './src',
    testRegex: '.*\\.spec\\.ts$',
    transform: {
        '^.+\\.ts$': 'ts-jest',
    },
    collectCoverage: true,
    coverageDirectory: '../coverage',
    coverageReporters: ['text', 'lcov'],
};
