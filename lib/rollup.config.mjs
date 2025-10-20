import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import cleanup from 'rollup-plugin-cleanup';
import filesize from 'rollup-plugin-filesize';
import dts from 'rollup-plugin-dts';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';

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
      copy({
        targets: [
          {src: 'src/types/globals.d.ts', dest: 'dist/types'},
          {src: 'src/jsx/jsx-runtime.ts', dest: 'dist/jsx'},
        ],
        hook: 'writeBundle',
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
    plugins: [
      dts(),
      del({targets: ['dist/types-temp'], hook: 'writeBundle'}),
    ],
  },

  {
    input: 'src/jsx/jsx-runtime.ts',
    plugins: [
      nodeResolve({extensions: ['.js', '.ts', '.tsx']}),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        sourceMap: true,
        compilerOptions: {
          declaration: false,
          emitDeclarationOnly: false,
        },
      }),
      cleanup(),
    ],
    output: [
      {
        file: 'dist/jsx/jsx-runtime.js',
        format: 'esm',
        sourcemap: true,
      },
      {
        file: 'dist/jsx/jsx-runtime.min.js',
        format: 'esm',
        sourcemap: true,
        plugins: [terser()],
      },
    ],
  },
];

export default config;
