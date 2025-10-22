import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import filesize from 'rollup-plugin-filesize';
import dts from 'rollup-plugin-dts';
import del from 'rollup-plugin-delete';
import copy from 'rollup-plugin-copy';

const config = [
  {
    input: 'src/index.ts',
    plugins: [
      nodeResolve({extensions: ['.js', '.ts', '.tsx']}),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
        compilerOptions: {
          declaration: true,
          declarationDir: 'dist/types-temp',
          emitDeclarationOnly: false,
          declarationMap: false,
        },
      }),
      cleanup(),
    ],
    output: [
      {
        file: 'dist/react.js',
        format: 'esm',
        sourcemap: true,
        plugins: [filesize()],
      },
      {
        file: 'dist/react.min.js',
        format: 'esm',
        sourcemap: true,
        plugins: [terser(), filesize()],
      },
    ],
  },
  {
    input: 'dist/types-temp/index.d.ts',
    output: {
      file: 'dist/react.d.ts',
      format: 'es',
    },
    plugins: [dts(), del({targets: ['dist/types-temp'], hook: 'writeBundle'})],
  },
];

export default config;
